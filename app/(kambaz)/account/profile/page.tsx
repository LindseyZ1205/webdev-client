import Link from "next/link";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <p>Sample profile from the textbook.</p>
      <label htmlFor="wd-profile-username">Username</label>
      <br />
      <input
        id="wd-profile-username"
        defaultValue="alice"
        placeholder="username"
        className="wd-username"
      />
      <br />
      <label htmlFor="wd-profile-password">Password</label>
      <br />
      <input
        id="wd-profile-password"
        defaultValue="123"
        placeholder="password"
        type="password"
        className="wd-password"
      />
      <br />
      <label htmlFor="wd-firstname">First Name</label>
      <br />
      <input defaultValue="Alice" placeholder="First Name" id="wd-firstname" />
      <br />
      <label htmlFor="wd-lastname">Last Name</label>
      <br />
      <input
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
      />
      <br />
      <label htmlFor="wd-dob">Date of birth</label>
      <br />
      <input defaultValue="2000-01-01" type="date" id="wd-dob" />
      <br />
      <label htmlFor="wd-email">Email</label>
      <br />
      <input defaultValue="alice@example.com" type="email" id="wd-email" />
      <br />
      <label htmlFor="wd-role">Role</label>
      <br />
      <select defaultValue="FACULTY" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <br />
      <Link href="/account/signin">Sign out</Link>
    </div>
  );
}
