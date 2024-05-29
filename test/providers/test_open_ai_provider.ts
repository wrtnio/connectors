import dotenv from "dotenv";
import OpenAI from "openai";
import typia, { tags } from "typia";

import { OpenAIProvider } from "../../src/providers/open_ai/OpenAIProvider";

const logger = require("pino")();

dotenv.config();
const openAIProvider = new OpenAIProvider(new OpenAI(), new OpenAI(), logger);

/**
 * Get appointment information
 */
interface Appointment {
  member: Member;
  start: string & tags.Format<"date-time">;
  end: null | (string & tags.Format<"date-time">);
  participants: Participant[] & tags.MinItems<1>;
  created_at: string & tags.Format<"date-time">;
}

interface Participant {
  id: string;
  member: Member;
  created_at: string & tags.Format<"date-time">;
  accepted_at: null | (string & tags.Format<"date-time">);
  rejected_at: null | (string & tags.Format<"date-time">);
}

interface Member {
  id: string;
  nickname: string;
  email: string & tags.Format<"email">;
  mobile: string;
}

// each run costs around 251 * 0.01 / 1000 + 192 * 0.03 / 1000 = 0.00827 USD (as of 20240105)
// example usage: { prompt_tokens: 251, completion_tokens: 192, total_tokens: 443 }
// so don't run this automatically - costs can add up pretty quickly
openAIProvider
  .extractInterface(
    "I have an appointment with Kevin (kevin@gmail.com) (010-1111-1111) on 2023-11-13 15:00:00. I am Mark (mark@gmail.com) (010-2222-1111)",
    typia.json.application<[Appointment]>(),
    typia.createIs<Appointment>(),
    "gpt-4-turbo",
  )
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

openAIProvider
  .generateImage("Generate an image of a cat")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
