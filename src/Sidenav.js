import { useLoginActions } from "./Hooks/useLoginActions";
import { useParamsProjectId } from "./Hooks/useParamsProjectId";
import "./Sidenav.css";

export function Sidenav() {
  const projectId = useParamsProjectId();
  const loginActions = useLoginActions();
  return (
    <nav className="Sidenav">
      <ul>
        <li>
          <button onClick={loginActions.logout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}
