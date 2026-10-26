import Modules from "../modules/page";
import CourseStatus from "./Status";
export default function Home({ params }: { params: Promise<{ cid: string }> }) {
  return (
    <div id="wd-home">
      <table>
        <tbody>
          <tr>
            <td valign="top" width="70%">
              <Modules params={params} />
            </td>
            <td valign="top">
              <CourseStatus />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
