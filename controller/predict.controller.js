import axios from "axios"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const predict = async (req, res) => {

    try {

        const data = req.body

        console.log(data)

        const url = 'http://127.0.0.1:5000/api/predict'

        const modelResult = await axios.post(url, data)

        const { prediction, probability } = modelResult.data

        const llm = new ChatGoogleGenerativeAI({
            model: "gemini-1.5-pro",
            temperature: 0,
            maxRetries: 2,

        });

        const aiMsg = await llm.invoke([
            [
                "system",
                "You are a helpful medical assistant that give the liver health tips to the users based on the probability score of the liver disease, Suggest foods, excersize, and diet plan to stay helthy .",
            ],
            ["human", `liver disease with ${probability}%`],
        ]);

        // aiMsg

        const llmResponse = aiMsg.content
        console.log(llmResponse)
        
        res.status(200).json({ llmResponse, prediction, probability })

    } catch (error) {
        console.log('predict -->', error)
    }
}

export { predict }