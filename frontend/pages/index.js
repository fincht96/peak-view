import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.scss";

import Amplify, { Auth, Hub } from 'aws-amplify';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";


const formatAsDate = (ms) => {
  let date = new Date(parseInt(ms));


  let year = date.getFullYear() - 2000;
  let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  return `${day}/${month}/${year}`;
}

const formatAsTime = (ms) => {
  let date = new Date(parseInt(ms));


  let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  let mins = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${hours}:${mins}`;
}

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
  typeDefs: gql`
    enum MedicationTime {
      NONE
      PRE
      POST
    }
  `,
});

const GET_READINGS = gql`
  query GetReadings {
    readings {
      id
      pefValue
      medication
      comment
      createdAt
    }
  }
`;

const ADD_READING = gql`
  mutation AddReading(
    $pefValue: Int
    $medication: String
    $medicationTime: MedicationTime
    $comment: String
  ) {
    addReading(
      pefReading: {
        pefValue: $pefValue
        medication: $medication
        medicationTime: $medicationTime
        comment: $comment
      }
    ) {
      success
      message
      pefReading {
        pefValue
        id
        comment
        medication
        medicationTime
        createdAt
      }
    }
  }
`;

const DELETE_READING = gql`
  mutation DeleteReading($id: ID!) {
    deleteReading(id: $id) {
      success
      message
    }
  }
`;

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let resultsList = this.props.results.map((result) => (
      <tr key={result.id}>
        <td>{formatAsDate(result.createdAt)}</td>
        <td>{formatAsTime(result.createdAt)}</td>
        <td>{result.pefValue}</td>
        <td>{result.medication}</td>
        <td>{result.comment}</td>

        <td>
          {" "}
          <input
            type="checkbox"
            onChange={(e) => {
              this.props.onSelected(e, result.id);
            }}
          />
        </td>
      </tr>
    ));

    return (
      <table className={styles.table}>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>PEFR (L/min)</th>
          <th>Medication</th>
          <th>Comment</th>
          <th>#</th>
        </tr>

        {resultsList} 
      </table>
    );
  }
}

class ReadingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pefValue: "",
      medication: "",
      medicationTime: "NONE",
      comment: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let newReading = {
        pefValue: parseInt(this.state.pefValue),
        medication: this.state.medication,
        medicationTime: this.state.medicationTime,
        comment: this.state.comment,
      };
      let res = await client.mutate({
        mutation: ADD_READING,
        variables: newReading,
      });
      this.props.addNewReading(res.data.addReading.pefReading);
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <div className={styles.subTitle}>Add new result:</div>

        <label className={styles.inputGroup}>
          <div className={styles.fieldName}>PEFR (L/min):</div>

          <input
            name="pefValue"
            type="number"
            value={this.state.pefValue}
            onChange={this.handleChange}
          />
        </label>

        <label className={styles.inputGroup}>
          <div className={styles.fieldName}>Medication:</div>
          <input
            name="medication"
            type="text"
            value={this.state.medication}
            onChange={this.handleChange}
          />
        </label>

        <label className={styles.inputGroup}>
          <div className={styles.fieldName}>Medication Time:</div>
          <select
            name="medicationTime"
            value={this.state.medicationTime}
            onChange={this.handleChange}
          >
            <option value="NONE">None</option>
            <option value="PRE">Pre-med</option>
            <option value="POST">Post-med</option>
          </select>
        </label>

        <label className={styles.inputGroup}>
          <div className={styles.fieldName}>Comment:</div>
          <input
            name="comment"
            type="text"
            value={this.state.comment}
            onChange={this.handleChange}
          />
        </label>

        <input
          className={styles.addReadingBtn}
          type="submit"
          value="Add Reading"
        />
      </form>
    );
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Thomas",
      results: [],
      selected: [],
    };

    this.deleteSelected = this.deleteSelected.bind(this);
    this.onSelected = this.onSelected.bind(this);
  }

  onSelected(event, id) {
    if (event.target.checked) {
      this.setState((prevState) => ({
        selected: [...prevState.selected, id],
      }));
    } else {
      let newArray = this.state.selected.filter((el) => {
        if (el !== id) {
          return el;
        }
      });
      this.setState({
        selected: [...newArray],
      });
    }
  }

  async deleteSelected(event) {
    try {
      for (let i = 0; i < this.state.selected.length; i++) {
        await client.mutate({
          mutation: DELETE_READING,
          variables: {
            id: this.state.selected[i],
          },
        });
      }

      let newResults = this.state.results.filter((result) => {
        if (!this.state.selected.includes(result.id)) {
          return result;
        }
      });

      this.setState({
        selected: [],
        results: newResults,
      });
    } catch (e) {
      console.error(e);
    }

    event.preventDefault();
  }

  async componentDidMount() {
    console.log("component mounted");

    try {
      let results = await client.query({ query: GET_READINGS });

      console.log(results);

      this.setState({
        results: results.data.readings,
      });

      console.log(this.state.results);
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <header>
          <h1>Peak View</h1>
        </header>

        <button onClick={() => Auth.federatedSignIn({provider: 'Google'})}>Open Google</button>

        <div className={styles.main}>
          <ReadingForm
            addNewReading={(reading) => {
              console.log(reading);
              this.setState({
                results: [...this.state.results, reading],
              });
            }}
          />

          <br />

          <img
            onClick={this.deleteSelected}
            src="/bin_icon.png"
            alt="delete icon"
            className={styles.delete}
          />

          <Results results={this.state.results} onSelected={this.onSelected} />
        </div>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    );
  }
}
