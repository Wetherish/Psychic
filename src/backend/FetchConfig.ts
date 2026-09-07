import { parse, stringify } from 'smol-toml';
import { readFileSync } from 'fs';

interface CommandConfig {
  Commands: string[];
}

interface ServerConfig {
  url: string;
}

interface Config {
  Commands: CommandConfig;
  Server: ServerConfig;
}

const tomlString = readFileSync('./Example.toml', 'utf-8');
const data = parse(tomlString) as unknown as Config;

const commandMap = new Map<string, string[]>( Object.entries(data.Commands).map(([key, value]) => [key, value.Commands]));

export { commandMap };
