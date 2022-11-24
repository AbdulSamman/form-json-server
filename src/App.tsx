import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";

interface IJob {
  id: number;
  jobTitle: string;
  description: string;
  city: string;
  details: {
    remote: boolean;
    fullTime: boolean;
    largeCompany: boolean;
  };
  salary: number;
  postingDate: Date;
  rank: string;
}

const _formData = {
  jobTitle: "",
  description: "",
  city: "",
  details: {
    remote: false,
    fullTime: false,
    largeCompany: false,
  },
  salary: 0,
  postingDate: "",
  rank: "",
};

const backendUrl = "http://localhost:6777";

function App() {
  const [formData, setFormData] = useState(_formData);
  const [jobs, setJobs] = useState<IJob[]>([]);

  const getJobs = async () => {
    const _jobs = (await axios.get(`${backendUrl}/jobs`)).data;
    setJobs(_jobs);
  };

  useEffect(() => {
    getJobs();
  }, []);

  const handleFormChange = (e: any, fieldName: string) => {
    const value = e.target.value;
    const checked = e.target.checked;
    switch (fieldName) {
      case "jobTitle":
        formData.jobTitle = value;

        break;
      case "description":
        formData.description = value;
        break;
      case "city":
        formData.city = value;
        break;
      case "remote":
        formData.details.remote = checked;
        break;
      case "fullTime":
        formData.details.fullTime = checked;
        break;
      case "largeCompany":
        formData.details.largeCompany = checked;
        break;
      case "salary":
        formData.salary = value;
        break;
      case "date":
        formData.postingDate = value;
        break;
      case "rank":
        formData.rank = value;
        break;
    }
    setFormData({ ...formData });
  };

  const handleSaveForm = async (e: any) => {
    e.preventDefault();
    (async () => {
      const response = await axios.post(`${backendUrl}/jobs`, formData);
      getJobs();
      formData.jobTitle = "";
      formData.description = "";
      formData.salary = 0;
    })();
  };
  const handleDeleteJob = async (job: IJob) => {
    const response = await axios.delete(`${backendUrl}/jobs/${job.id}`);
    getJobs();
  };
  return (
    <div className="App">
      <h1>Jobs Site</h1>
      <main>
        <form>
          <fieldset>
            <legend>New Job</legend>
            <div className="rows">
              <div className="row">
                <label>Job Title</label>
                <div>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    maxLength={50}
                    onChange={(e) => handleFormChange(e, "jobTitle")}
                  />
                </div>
              </div>
              <div className="row">
                <label>Description</label>
                <div>
                  <textarea
                    maxLength={500}
                    placeholder="max 500 characters..."
                    value={formData.description}
                    onChange={(e) => handleFormChange(e, "description")}
                  />
                </div>
              </div>
              <div className="row">
                <label>City</label>
                <div>
                  <select onChange={(e) => handleFormChange(e, "city")}>
                    <option value="">(please select...)</option>
                    <option value="hannover">hannover</option>
                    <option value="berlin">Berlin</option>
                    <option value="hamburg">Hamburg</option>
                    <option value="bonn">Bonn</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <label>Details</label>
                <div className="checkboxes">
                  <div>
                    <input
                      type="checkbox"
                      checked={formData.details.remote}
                      onChange={(e) => handleFormChange(e, "remote")}
                    />
                    remote
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={formData.details.fullTime}
                      onChange={(e) => handleFormChange(e, "fullTime")}
                    />
                    full-time
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={formData.details.largeCompany}
                      onChange={(e) => handleFormChange(e, "largeCompany")}
                    />
                    large company
                  </div>
                </div>
              </div>
              <div className="row">
                <label>Monthly Salary in Euros</label>
                <div>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => handleFormChange(e, "salary")}
                    step={100}
                  />
                </div>
              </div>
              <div className="row">
                <label>Job Posting Date</label>
                <div>
                  <input
                    type="date"
                    min={"2022-11-24"}
                    max="2050-12-31"
                    value={formData.postingDate}
                    onChange={(e) => handleFormChange(e, "date")}
                  />
                </div>
              </div>
              <div className="row">
                <label>
                  Rank
                  {formData.rank ? (
                    <span className="rank"> {formData.rank}</span>
                  ) : (
                    " " + 0
                  )}
                </label>

                <div>
                  <input
                    type="range"
                    value={formData.rank}
                    onChange={(e) => handleFormChange(e, "rank")}
                    min="0"
                    max="10"
                    step={0.1}
                  />
                </div>
              </div>
            </div>
            <div>
              <button onClick={(e) => handleSaveForm(e)}>Save</button>
            </div>
          </fieldset>
        </form>
        <div className="debuggingPanel">
          <div className="debug">Debugging Panel:</div>
          <section>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </section>
          <div className="currentJobs">
            <h2>There are {jobs.length} jobs.</h2>
            <div>
              {jobs.map((job) => {
                return (
                  <div key={job.id} className="job">
                    {job.jobTitle}{" "}
                    <span
                      onClick={() => handleDeleteJob(job)}
                      className="delete"
                    >
                      (delete)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
