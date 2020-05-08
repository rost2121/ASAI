import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/SideBar'
import TopBar from '../../Components/TopBar'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:8000'
});

const headerSortingStyle = { backgroundColor: '#c8e6c9' };

const columns = [
  {
    dataField: 'id',
    text: 'Photo name',
    sort: true,
    headerSortingStyle,
    filter: textFilter(),
  },
  {
    dataField: 'likes',
    sort: true,
    headerSortingStyle,
    text: 'Likes',
  },
  {
    dataField: 'comments',
    sort: true,
    headerSortingStyle,
    text: 'Comments',
  },
  {
    dataField: 'product_id',
    text: 'Keywords (tag)',
    filter: textFilter(),
  },

];

const defaultSorted = [
  {
    dataField: "name",
    order: "asc"
  }
];

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }));


export default function SM() {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
      try {
        api.get('crm/photo', {}).then(response => {
          if (response.data !== '') {
           setProducts(response.data);
          }
        })
      } catch (err) {
        console.log('Error on get users list')
      }
    }, [])
    

    return (
        <div className={classes.root}>
          <CssBaseline />
          <TopBar pageTitle={'Social Media'}/>
          <Sidebar currentPage={12} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <BootstrapTable 
              keyField='id'
              data={ products }
              columns={ columns }
              pagination={ paginationFactory() }
              filter={ filterFactory() }
              defaultSorted={defaultSorted}
              noDataIndication={ <div className="spinner-border fast" role="status"/> }
              filterPosition="top"
              bootstrap4 = {true}
             />

          </main>
        </div>
    );
  
}