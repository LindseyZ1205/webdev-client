import ModuleList from "./ModuleList";
export default async function Modules({ params }: { params: Promise<{ cid: string }> }) {
  const { cid } = await params;
  return (
    <div>
      <button type="button">Collapse All</button>{" "}
      <button type="button">View Progress</button>{" "}
      <select aria-label="Publish modules" defaultValue="publish-all">
        <option value="publish-all">Publish All</option>
      </select>{" "}
      <button type="button">+ Module</button>
      <ModuleList cid={cid} />
    </div>
  );
}
