export type HTML = string;
const PATHNAMES = ["/", "/career", "/quote"] as const;
export type Pathname = (typeof PATHNAMES)[number];
export function isValidPathname(value: string): value is Pathname {
  return (PATHNAMES as readonly string[]).includes(value);
}
export type Pages = Record<Pathname, HTML>;
