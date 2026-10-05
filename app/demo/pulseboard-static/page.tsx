import { Dashboard } from "../pulseboard/dashboard";

/**
 * Pixel-complete static variant of the Pulseboard demo.
 * Used only for generating the portfolio preview capture:
 * no entrance animations, all data rendered immediately.
 */
export default function PulseboardStaticPage() {
  return <Dashboard instant={true} />;
}
