import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import SERVICE_IDENTIFIER from '../../Constants/Identifiers';
import container from '../../Infrastructure/Installer';
import { Pokemon } from '../../models/pokemon';
import { IPokemonService } from '../../services/interfaces/iPokemonService';

const columns = [
    // {
    //   name: 'Pokemon Id',
    //   selector: 'Name',
    //   sortable: true,
    // },
    {
      name: 'Pokemon Name',
      selector: 'Name',
      sortable: true,
    },
    {
      name: 'Pokemon Url',
      selector: 'Url',
      sortable: true,
    }
  ];

const pokeService = container.get<IPokemonService>(SERVICE_IDENTIFIER.IPokemonService);

const DTable = ()=> {
    const [data, setData] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [limit, setLimit] = useState(10); //perPage

    const fetchUsers = async (offset:number) => {
        setLoading(true);

        // const response = await fetch(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);
        // const data = await response.json();
        const data = await pokeService.list(offset, limit)
        console.log(data)
        setData(data.Pokemons);
        setTotalRows(data.Count);
        setLoading(false);
    };

    const handlePageChange = (offset:any) => {
        fetchUsers(offset);
    };

    const handlePerRowsChange = async (newLimit:any, offset:number) => {
        setLoading(true);
        // const response = await fetch(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);
        // const data = await response.json();

        const data = await pokeService.list(offset, newLimit)

        setData(data.Pokemons);
        setLimit(newLimit);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers(1);
    }, []);
    
    // 
  
    return (
        <DataTable
            title="Users"
            columns={columns}
            data={data}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            selectableRows
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
        />
    );
  }
  
  export default DTable;

