import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const getGeminiResponse = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  // console.log(result.response.text());
  return result.response.text();
};

const generateUsingAI = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(200).json({
        success: true,
        data: "",
      });
    }
    const prompt = `${text} give the content accrording to this in 20-30 words in one paragraph`;
    const response = await getGeminiResponse(prompt);
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error While getting Gemini response",
    });
  }
};

export default generateUsingAI;
