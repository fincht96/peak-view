import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/Home.module.css'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000',
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
    }
  }
`;

const ADD_READING = gql`
  mutation AddReading($pefValue: Int, $medication: String, $medicationTime: MedicationTime, $comment: String) {
    addReading(pefReading:{pefValue: $pefValue, medication: $medication, medicationTime: $medicationTime, comment: $comment}){
      success
      message
      pefReading {
        pefValue
      }
    } 
  }
`

// id: ID!
// createdAt: String
// pefValue: Int
// medication: String
// medicationTime: MedicationTime
// comment: String

class ReadingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pefValue: '', 
      medication: '', 
      medicationTime: 'NONE', 
      comment: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });


  }

  async handleSubmit(event){
    console.log(this.state)
    event.preventDefault();

    let res = await client.mutate({mutation: ADD_READING,  variables: {
      pefValue: parseInt(this.state.pefValue),
      medication: this.state.medication,
      medicationTime: this.state.medicationTime,
      comment: this.state.comment,
    } });

    console.log('res', res)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          PEF:
          <input name="pefValue" type="number" value={this.state.pefValue} onChange={this.handleChange} />
        </label>

        <br/>

        <label>
          Medication:
          <input name="medication" type="text" value={this.state.medication} onChange={this.handleChange} />
        </label>

        <br/>

        <label>
          Medication time:
          <select name="medicationTime" value={this.state.medicationTime} onChange={this.handleChange}>
            <option value="NONE">None</option>
            <option value="PRE">Pre-med</option>
            <option value="POST">Post-med</option>
          </select>
        </label>

        <br/>

        <label>
          Comment:
          <input name="comment" type="text" value={this.state.comment} onChange={this.handleChange} />
        </label>

        <br/>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}



export default class Home extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      name: 'Thomas',
      results: []
    }
  }

  async componentDidMount(){
    console.log("component mounted")
   
    try{
      let results = await client.query({query: GET_READINGS});

      this.setState({
        results: results.data.readings,
      });

      console.log(this.state.results)
      
    }
    catch(e){
      console.error(e)
    }

   




  }

  render(){

    let listResults = this.state.results.map((result) =>
      <li className={styles.reading} key={result.id}>{result.pefValue}, {result.medication}, {result.comment}</li>
    );

    return (
      

      <div className={styles.container}> 

      <div className={styles.main}>


      <div>Add new result:</div>
      <ReadingForm/>
    
        
        
    
      {listResults}


      </div>
      
      <footer className={styles.footer}>
         <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
      </div>
    )
  }
}


