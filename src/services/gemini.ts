import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getHealthAdvice(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: `أنت مساعد طبي ذكي في تطبيق "مركز أُم علي الطبي". 
        مهمتك هي تقديم نصائح صحية عامة، شرح المصطلحات الطبية، وتسهيل التصفح والبحث في التطبيق.
        لديك معلومات عن الأطباء (د. عثمان أحمد - طبيب عمومي، د. السني خالد - مختبر)، والفحوصات (مثل الملاريا، التايفويد، وظائف الكلى)، والأدوية في الصيدلية (مثل Artesunate, Panadol, Amoxil).
        
        عندما يسأل المستخدم عن دواء أو فحص، قدم له السعر والمعلومات المتوفرة.
        إذا طلب المستخدم الذهاب لقسم معين (مثل الصيدلية أو الأطباء)، وجهه لذلك.
        
        دائماً ابدأ بالترحيب وكن ودوداً. 
        تنبيه هام: أخبر المستخدم دائماً أن هذه النصائح لا تغني عن زيارة الطبيب المختص.
        اجعل إجاباتك مختصرة ومفيدة وباللغة العربية.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، واجهت مشكلة في الاتصال بالمساعد الذكي. يرجى المحاولة لاحقاً.";
  }
}

export async function checkSymptoms(symptoms: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `بناءً على الأعراض التالية: "${symptoms}"، ما هي الاحتمالات الممكنة وما هو التخصص الطبي المناسب؟`,
        config: {
          systemInstruction: `أنت خبير في تحليل الأعراض الأولية. 
          قم بتحليل الأعراض المقدمة واقترح التخصص الطبي المناسب (مثلاً: باطنية، أطفال، عظام).
          يجب أن يكون الرد بتنسيق JSON يحتوي على:
          - possibilities: قائمة بالاحتمالات الممكنة (بشكل عام وغير تشخيصي نهائي).
          - recommendedSpecialty: التخصص الموصى به.
          - urgency: مستوى الاستعجال (Low, Medium, High).
          - advice: نصيحة أولية.
          تذكر دائماً إضافة تنبيه بأن هذا ليس تشخيصاً طبياً نهائياً.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              possibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendedSpecialty: { type: Type.STRING },
              urgency: { type: Type.STRING },
              advice: { type: Type.STRING }
            },
            required: ["possibilities", "recommendedSpecialty", "urgency", "advice"]
          }
        },
      });
      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Symptom Check Error:", error);
      return null;
    }
}
