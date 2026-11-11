"use client";
import { createContext, useContext, useState } from "react";
import { create } from "zustand";
import { Section } from "./ExerciseUI";
type Profile = { firstName: string; lastName: string; password: string; dob: string; role: string; newsletter: boolean; topics: string[]; theme: string };
const emptyProfile: Profile = { firstName: "", lastName: "", password: "", dob: "", role: "", newsletter: false, topics: [], theme: "light" };
function ProfileFields({ label, draft, setDraft }: { label: string; draft: Profile; setDraft: (profile: Profile) => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  return <Section title={label}><form noValidate onSubmit={(e) => {
    e.preventDefault(); const next: Record<string, string> = {};
    if (!draft.firstName.trim()) next.firstName = "First name is required.";
    if (!draft.lastName.trim()) next.lastName = "Last name is required.";
    if (draft.password.length < 8) next.password = "Use at least 8 characters.";
    if (!draft.dob || new Date(`${draft.dob}T00:00:00`) > new Date()) next.dob = "Choose a date of birth in the past.";
    if (!draft.role) next.role = "Choose a role.";
    if (!draft.topics.length) next.topics = "Choose at least one topic.";
    setErrors(next); setSaved(Object.keys(next).length === 0);
  }} onChange={() => setSaved(false)}>
    {(["firstName", "lastName", "password", "dob"] as const).map((field) => <div key={field}><label>{field}<input type={field === "password" ? "password" : field === "dob" ? "date" : "text"} value={draft[field]} onChange={(e) => setDraft({ ...draft, [field]: e.target.value })} /></label>{errors[field] && <p role="alert">{errors[field]}</p>}</div>)}
    <label>Role<select value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })}><option value="">Choose role</option>{["STUDENT", "TA", "FACULTY"].map((role) => <option key={role}>{role}</option>)}</select></label>{errors.role && <p role="alert">{errors.role}</p>}
    <label><input type="checkbox" checked={draft.newsletter} onChange={(e) => setDraft({ ...draft, newsletter: e.target.checked })} />Newsletter</label>
    <fieldset><legend>Topics</legend>{["HTML", "CSS", "React"].map((topic) => <label key={topic}><input type="checkbox" checked={draft.topics.includes(topic)} onChange={(e) => setDraft({ ...draft, topics: e.target.checked ? [...draft.topics, topic] : draft.topics.filter((t) => t !== topic) })} />{topic}</label>)}{errors.topics && <p role="alert">{errors.topics}</p>}</fieldset>
    <fieldset><legend>Theme</legend>{["light", "dark"].map((theme) => <label key={theme}><input type="radio" name={`${label}-theme`} checked={draft.theme === theme} onChange={() => setDraft({ ...draft, theme })} />{theme}</label>)}</fieldset>
    <button type="submit">Save profile</button>{saved && <p role="status">Profile validated for this session.</p>}
  </form></Section>;
}

const ProfileContext = createContext<{ draft: Profile; setDraft: (profile: Profile) => void } | null>(null);
function ContextProfileFields() {
  const value = useContext(ProfileContext);
  if (!value) throw new Error("ProfileContext provider is required");
  return <ProfileFields label="Profile Form (React Context)" {...value} />;
}
function ContextProfileForm() {
  const [draft, setDraft] = useState({ ...emptyProfile });
  return <ProfileContext.Provider value={{ draft, setDraft }}><ContextProfileFields /></ProfileContext.Provider>;
}
const useProfileStore = create<{ draft: Profile; setDraft: (profile: Profile) => void }>((set) => ({ draft: { ...emptyProfile }, setDraft: (draft) => set({ draft }) }));
function ZustandProfileForm() {
  const value = useProfileStore();
  return <ProfileFields label="Profile Form (Zustand)" {...value} />;
}
export default function ProfileExamples() {
  const [draft, setDraft] = useState({ ...emptyProfile });
  return <><ProfileFields label="Profile Form and Validation" draft={draft} setDraft={setDraft} /><ContextProfileForm /><ZustandProfileForm /></>;
}
