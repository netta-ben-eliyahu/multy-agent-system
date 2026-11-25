import { createAgent } from "langchain";
import { HumanMessage } from "@langchain/core/messages";
import { model } from "./models.js";

/**
 * Our first agent: model + system prompt. No tools yet.
 * The system prompt defines WHO the agent is and HOW it should behave.
 */
const agent = createAgent({
    model,
    tools: [],
    systemPrompt:
        "You are a content strategist for a technology blog. " +
        "When given a topic, respond with a one-paragraph angle for an article: " +
        "who the audience is, what the hook is, and why now. Be concrete.",
});

// Read the topic from the command line
const topic = process.argv[2] ?? "The rise of edge computing";

const result = await agent.invoke({
    messages: [new HumanMessage(topic)],
});

// The result is a list of messages; the agent's answer is the last one
console.log(result.messages.at(-1)?.content);
//for debug porpuses
//for (const message of result.messages) {
//    console.log(`[${message.getType()}]`, String(message.content).slice(0, 100));
//}