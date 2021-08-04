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
        id
        comment
        medication
        medicationTime
      }
    } 
  }
`

const DELETE_READING = gql`
  mutation DeleteReading($id: ID!) {
    deleteReading(id: $id){
      success
      message
    } 
  }
`



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
    event.preventDefault();
    try{
      let newReading = {
          pefValue: parseInt(this.state.pefValue),
          medication: this.state.medication,
          medicationTime: this.state.medicationTime,
          comment: this.state.comment,
      }
      let res = await client.mutate({mutation: ADD_READING,  variables: newReading });
      this.props.addNewReading(res.data.addReading.pefReading);
    }
    catch(e){
      console.error(e)
    }


   
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
      results: [],
      selected: []
    }

    this.deleteSelected = this.deleteSelected.bind(this);
    this.onSelected = this.onSelected.bind(this);
  }

  onSelected(event, id){
    if(event.target.checked){
      this.state.selected = [...this.state.selected, id];
    }
  }

  async deleteSelected(event){

    console.log(this.state.selected[0])

    try{

      for(let i = 0; i < this.state.selected.length; i++){
        await client.mutate({mutation: DELETE_READING,  variables: {
          id: this.state.selected[i],
        } });
      }

      let newResults = this.state.results.filter((result) => {
        if(!this.state.selected.includes(result.id)){
          return result;
        }
      })

      this.setState({
        results: newResults
      })
  


    }
    catch(e){
      console.error(e)
    }
    

    
    event.preventDefault();

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
      <li className={styles.reading} key={result.id}>{result.pefValue}, {result.medication}, {result.comment} <input onChange={(e) => {
        this.onSelected(e, result.id)
      }} type="checkbox"/></li>
    );

    return (
      

      <div className={styles.container}> 

      <div className={styles.main}>


      <div>Add new result:</div>
      <ReadingForm addNewReading={(reading) => {

        console.log(reading)
        this.setState({
          results: [...this.state.results, reading]
        })
        
      }}/>

      <br/>
      
      <div onClick={this.deleteSelected}>delete selected</div>
    
        
        
    
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


