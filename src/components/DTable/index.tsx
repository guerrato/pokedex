import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import SERVICE_IDENTIFIER from '../../Constants/Identifiers';
import container from '../../Infrastructure/Installer';
import { Pokemon } from '../../models/pokemon';
import { IPokemonService } from '../../services/interfaces/iPokemonService';
import DLink from '../DLink';
import PokeSearch from '../PokeSearch';

const columns = [
    {
      name: 'Pokemon Id',
      selector: 'Id'
    },
    {
      name: 'Pokemon Name',
      selector: 'Name'
    },
    {
      name: '',
      button: true,
      cell: (row: any) => <DLink key={row.Id} href={'#'} text={'Details'} />,
    }
  ];

const pokeService = container.get<IPokemonService>(SERVICE_IDENTIFIER.IPokemonService);

const DTable = ()=> {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState<string>('')

    const getPokemonId = (url: string) : number => {
        const splitedUrl = url.substr(0, url.length - 1).split('/');
        return parseInt(splitedUrl[splitedUrl.length - 1]);
    }

    const mountTbData = (data: Pokemon[]) : void => {
        const poks = data.map((pk:Pokemon) => {
            const id = getPokemonId(pk.Url)
            return {
                Id: id,
                Name: pk.Name
            }
        });

        setData(poks)
    };

    const fetchPokemons = async (offset:number) => {
        setLoading(true);

        const data = await pokeService.list(offset, limit)
        mountTbData(data.Pokemons);
        setTotalRows(data.Count);
        setLoading(false);
    };

    const handlePageChange = (offset:any) => {
        fetchPokemons(offset);
    };

    const handlePerRowsChange = async (newLimit:any, offset:number) => {
        setLoading(true);

        const data = await pokeService.list(offset, newLimit)

        mountTbData(data.Pokemons);
        setLimit(newLimit);
        setLoading(false);
    };

    const searchPokemon = async () => {
        if (search.length === 0){
            handlePageChange(10)
        } else {
            const data = await pokeService.get(search)
            console.log(data)
            mountTbData(data.Pokemons);
        }
    }

    useEffect(() => {
        fetchPokemons(1);
    }, []);
  
    return (
        <>
            <PokeSearch text={search} onClick={searchPokemon} onChange={(e)=>setSearch(e.target.value)} />
            <DataTable
                title="Pokemon list"
                columns={columns}
                data={data}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </>
    );
  }
  
  export default DTable;

