import { GoogleGenAI } from '@google/genai';

const MODEL = 'gemini-3.6-flash';
const LANGUAGES = new Set(['English', 'German', 'French', 'Spanish', 'Italian', 'Japanese', 'Korean']);
const LEVELS = new Set(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
const COUNTS = new Set([10, 20, 30, 50]);
const REQUEST_TIMEOUT_MS = 45000;
const MAX_REQUEST_BYTES = 20000;
const MAX_TOPIC_LENGTH = 120;
const MAX_KNOWN_WORDS = 100;
const MAX_KNOWN_WORD_LENGTH = 120;

const responseSchema = {
  type: 'object',
  properties: {
    words: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          word: { type: 'string' },
          ipa: { type: 'string' },
          pos: { type: 'string' },
          meaning: { type: 'string' },
          example: { type: 'string' }
        },
        required: ['word', 'meaning', 'example']
      }
    }
  },
  required: ['words']
};

function send(res, status, body) {
  res.status(status).json(body);
}

function cleanString(value, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export function normalizeWords(value) {
  if (!value || !Array.isArray(value.words)) return [];
  const seen = new Set();

  return value.words.reduce((words, item) => {
    if (!item || typeof item !== 'object') return words;
    const word = cleanString(item.word, 120);
    const meaning = cleanString(item.meaning, 240);
    const example = cleanString(item.example, 500);
    const identity = word.toLocaleLowerCase();
    if (!word || !meaning || !example || seen.has(identity)) return words;

    seen.add(identity);
    words.push({
      word,
      ipa: cleanString(item.ipa, 120),
      pos: cleanString(item.pos, 40) || 'word',
      meaning,
      example
    });
    return words;
  }, []);
}

export function normalizeKnownWords(value) {
  return [...new Set((value || [])
    .map(word => cleanString(word, MAX_KNOWN_WORD_LENGTH).toLowerCase())
    .filter(Boolean))].slice(0, MAX_KNOWN_WORDS);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: '此端點僅接受 POST 請求。' });
  }

  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return send(res, 400, { error: '請提供有效的 JSON 請求內容。' });
  }
  let requestBytes;
  try {
    requestBytes = Buffer.byteLength(JSON.stringify(body), 'utf8');
  } catch {
    return send(res, 400, { error: '請提供有效的 JSON 請求內容。' });
  }
  if (requestBytes > MAX_REQUEST_BYTES) return send(res, 413, { error: '請求內容過大。' });

  if (typeof body.language !== 'string' || body.language.length > 30
    || typeof body.topic !== 'string' || body.topic.length > MAX_TOPIC_LENGTH
    || typeof body.level !== 'string' || body.level.length > 2) {
    return send(res, 400, { error: '請求欄位格式不正確。' });
  }

  const language = cleanString(body.language, 30);
  const topic = cleanString(body.topic, MAX_TOPIC_LENGTH);
  const level = cleanString(body.level, 2);
  const count = body.count;
  const rawKnownWords = body.knownWords;

  if (!LANGUAGES.has(language)) return send(res, 400, { error: '請選擇支援的目標語言。' });
  if (!topic) return send(res, 400, { error: '請輸入主題。' });
  if (!LEVELS.has(level)) return send(res, 400, { error: '請選擇有效的 CEFR 程度。' });
  if (!Number.isInteger(count) || !COUNTS.has(count) || count > 50) {
    return send(res, 400, { error: '單字數必須是 10、20、30 或 50，且不可超過 50。' });
  }
  if (rawKnownWords !== undefined && (!Array.isArray(rawKnownWords) || rawKnownWords.some(word => typeof word !== 'string'))) {
    return send(res, 400, { error: 'knownWords 必須是字串陣列。' });
  }
  if (rawKnownWords?.some(word => word.length > MAX_KNOWN_WORD_LENGTH)) {
    return send(res, 400, { error: 'knownWords 含有過長項目。' });
  }
  const knownWords = normalizeKnownWords(rawKnownWords);
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return send(res, 500, { error: 'AI 服務尚未完成伺服器設定。' });
  }

  const levelGuidance = {
    A1: 'Choose essential domain terms. Use very simple definitions, explanations, surrounding language, and short examples.',
    A2: 'Choose common domain terms. Use simple definitions and practical examples.',
    B1: 'Include broader terminology and useful collocations. Use clear definitions and natural contextual examples.',
    B2: 'Include nuanced terminology, idiomatic usage, and advanced domain expressions with appropriately detailed explanations.',
    C1: 'Include advanced specialist terminology and precise natural usage with sophisticated explanations and examples.',
    C2: 'Include highly precise specialist terminology, subtle distinctions, and expert-level natural usage.'
  };

  const prompt = [
    `Create exactly ${count} distinct ${language} vocabulary items about the topic: ${JSON.stringify(topic)}.`,
    `Apply CEFR level ${level} to the difficulty of definitions, explanations, example sentences, and surrounding language: ${levelGuidance[level]}`,
    'CEFR level must not exclude essential domain-specific terminology. The usefulness and real-world frequency of a domain term take priority over whether the isolated term appears on a general CEFR vocabulary list.',
    'For specialized topics such as yoga, tennis, medicine, design, technology, cooking, or music, prioritize terms that are genuinely common and useful in that domain. Prefer beginner-relevant domain terms unless the user explicitly requests advanced terminology.',
    'Include essential loanwords, proper technical terms, and terms originating in other languages when they are commonly used. Never replace an essential domain term with an overly generic beginner word merely to satisfy the CEFR level.',
    `Apply CEFR ${level} to the target-language examples and surrounding language, not to the length of the Traditional Chinese translation. Each example must be natural, written in ${language}, and appropriate for CEFR ${level}.`,
    'For the meaning field, return only the most common and natural Traditional Chinese translation a native Taiwanese speaker would expect on a flashcard.',
    'The meaning field is a translation, not a definition: do not explain the word, describe its usage, give legal or formal definitions, add notes, or write a sentence.',
    'Prefer 2–6 Chinese characters. Use up to 10 Chinese characters only when a shorter translation would lose the meaning. Never generate paragraph-style meanings.',
    'Do not add punctuation unless it is part of the translated term. Never begin a meaning with 指、用於、表示、指的是、用來、用以、證明、一種.',
    'Translation examples: Financial means → 財力證明; Return ticket → 回程機票; Boarding pass → 登機證; Customs declaration → 海關申報; Carry-on baggage → 隨身行李; Emergency exit → 緊急出口; Passport → 護照; Check in → 辦理報到.',
    'When the target language is English, use in the word field the English form commonly used by English speakers, including the established English form of a loanword or borrowed technical term.',
    knownWords.length
      ? `Prefer vocabulary the learner has not seen before. Avoid these known words when reasonable: ${JSON.stringify(knownWords)}. If avoiding all of them would reduce relevance or correctness, prioritize useful topic vocabulary.`
      : '',
    'Use the keys word, ipa, pos, meaning, and example. IPA may be an empty string when inappropriate.',
    'Return only data matching the requested JSON schema. Do not include markdown or commentary.'
  ].filter(Boolean).join('\n');

  try {
    const ai = new GoogleGenAI({ apiKey });
    const generation = ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: { responseMimeType: 'application/json', responseSchema }
    });
    let timeoutId;
    const timeout = new Promise((_, reject) => {
      timeoutId = setTimeout(() => reject(Object.assign(new Error('timeout'), { code: 'TIMEOUT' })), REQUEST_TIMEOUT_MS);
    });
    const response = await Promise.race([generation, timeout]).finally(() => clearTimeout(timeoutId));

    let parsed;
    try {
      parsed = JSON.parse(response.text);
    } catch {
      return send(res, 502, { error: 'AI 傳回的資料格式無法解析，請重試。' });
    }

    const words = normalizeWords(parsed);
    if (!words.length) return send(res, 502, { error: 'AI 沒有傳回可用的單字，請調整主題後重試。' });
    if (words.length < count) return send(res, 502, { error: 'AI 傳回的有效單字數不足，請重試。' });

    return send(res, 200, { language, topic, level, count: words.length, words: words.slice(0, count) });
  } catch (error) {
    if (error?.code === 'TIMEOUT') return send(res, 504, { error: 'AI 產生逾時，請稍後重試。' });
    return send(res, 502, { error: 'AI 服務暫時無法完成請求，請稍後重試。' });
  }
}
