import Environment from "./Environment";
import Parameters from "./Parameters";
import WorkingWithRemoteObjects from "./WorkingWithRemoteObjects";
import WorkingWithRemoteArrays from "./WorkingWithRemoteArrays";
import HttpClient from "./HttpClient";
import WorkingWithRemoteObjectsAsync from "./WorkingWithRemoteObjectsAsync";
import WorkingWithRemoteArraysAsync from "./WorkingWithRemoteArraysAsync";
import HelloRoute from "./HelloRoute";
import Calculator from "./Calculator";
import styles from "./Lab5.module.css";

export default function Lab5() {
  return (
    <main id="wd-lab5" className={styles.lab}>
      <h1>Lab 5: HTTP and REST APIs</h1>
      <p>Yingzi Zhang · Express requests, remote data, and Next.js Route Handlers</p>
      <p>The Express examples share in-memory data. Changes survive a page refresh while the server is running; restarting the server restores its sample data.</p>
      <Environment />
      <Parameters mode="path" />
      <Parameters mode="query" />
      <WorkingWithRemoteObjects />
      <WorkingWithRemoteArrays />
      <HttpClient />
      <WorkingWithRemoteObjectsAsync />
      <WorkingWithRemoteArraysAsync />
      <HelloRoute />
      <Calculator />
    </main>
  );
}
