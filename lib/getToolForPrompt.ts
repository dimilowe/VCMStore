import { PROMPT_ROUTING_CONFIG, type Mode } from "./promptRoutingConfig";

export function getToolForPrompt(
  prompt: string,
  mode: Mode,
  cloudId: string
): string {
  const normalizedPrompt = prompt.toLowerCase().trim();

  const cloudConfig = PROMPT_ROUTING_CONFIG.find(
    (c) => c.cloudId === cloudId
  );

  if (!cloudConfig) {
    return "";
  }

  for (const rule of cloudConfig.keywordRules) {
    if (rule.modes && !rule.modes.includes(mode)) continue;

    const matches = rule.keywords.some((keyword) =>
      normalizedPrompt.includes(keyword.toLowerCase())
    );

    if (matches) {
      return rule.toolSlug;
    }
  }

  const modeDefault = cloudConfig.modeDefaults[mode];
  if (modeDefault) {
    return modeDefault;
  }

  return cloudConfig.primaryTool;
}
