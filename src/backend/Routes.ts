import { commandMap } from "../backend/FetchConfig";

export async function ListDataSets(path: string) {
  const command = commandMap.get('ListDataSets');
  command?.push(path);

  if (!command) {
    throw new Error("command not found");
  }

  const proc = Bun.spawn(command);

  const output = await new Response(proc.stdout).text();
  const exitCode = await proc.exited;

  if (exitCode !== 0) {
    throw new Error(`Command failed with exit code ${exitCode}`);
  }

  return output;
}
