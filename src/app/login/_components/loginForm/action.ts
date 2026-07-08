"use server";

import { createApiClient } from "@/utils/api/apiClient";
import { createSession } from "@/utils/auth/session";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { inputsSchema } from "./types";

export const signInAction = async (_prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: inputsSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const client = createApiClient({
    path: "/users/login",
    method: "post",
    params: {
      body: {
        user: submission.value,
      },
    },
  });

  const response = await client.sendRequest();

  if (response.result === "success") {
    await createSession(response.data.user.token);
    redirect("/");
  }

  switch (response.statusCode) {
    // Both 401 (unauthorized) and 422 (validation) from the login endpoint mean
    // the submitted credentials were rejected, so surface a single, friendly
    // failure message instead of raw backend field errors.
    case 401:
    case 422:
      return submission.reply({
        formErrors: ["Login failed. The email or password is incorrect."],
      });
    default:
      throw new Error("api error");
  }
};
