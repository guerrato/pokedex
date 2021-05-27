import React, { useEffect, useState, useCallback } from 'react';
import { Col, Container, Row, Form, ProgressBar } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import DataTable from 'react-data-table-component';
import SERVICE_IDENTIFIER from '../../Constants/Identifiers';
import container from '../../Infrastructure/Installer';
import { Pokemon } from '../../models/pokemon';
import { PokemonStat } from '../../models/pokemonStat';
import { PokemonType } from '../../models/pokemonType';
import { IPokemonService } from '../../services/interfaces/iPokemonService';
import DLink from '../DLink';
import PokeModal from '../PokeModal';
import PokeSearch from '../PokeSearch';
import './style.css'

const pokeService = container.get<IPokemonService>(SERVICE_IDENTIFIER.IPokemonService);

const DTable = ()=> {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState<string>('')
    const [showModal, setShowModal] = useState(false)
    const [selectedId, setSelectedId] = useState<number>(0)
    const [pokeInfo, setPokeInfo] = useState<Pokemon>()
    const [isDefaultImg, setIsDefaultImg] = useState<boolean>(true)
    const [maxStat, setMaxStat] = useState<number>(0)

    const capFirstLetter = (word: string = '') => {
        if (word.length <= 1){
            return word.toUpperCase();
        }

        word = word.trim();

        return `${word.substr(0, 1).toUpperCase()}${word.substr(1, word.length)}`
    }
    const handleClose = () => setShowModal(false);
    const handleShow = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setSelectedId(parseInt(e.currentTarget.id))
        setShowModal(true);
    }

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
          cell: (row: any) => <DLink key={row.Id} id={row.Id} text={'Details'} onClick={handleShow} />,
        }
    ];

    const getPokemonId = (url: string) : number => {
        const splitedUrl = url.substr(0, url.length - 1).split('/');
        return parseInt(splitedUrl[splitedUrl.length - 1]);
    }

    const mountTbData = useCallback((data: Pokemon[]) : void => {
        const poks = data.map((pk:Pokemon) => {
            const id = getPokemonId(pk.Url)
            return {
                Id: id,
                Name: pk.Name
            }
        });

        setData(poks)
    }, []);

    const fetchPokemons = useCallback(async (offset:number) => {
        setLoading(true);
        const data = await pokeService.list(offset, limit)
        mountTbData(data.Pokemons);
        setTotalRows(data.Count);
        setLoading(false);
    }, [limit, mountTbData])

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
            mountTbData(data.Pokemons);
        }
    }

    useEffect(() => {
        fetchPokemons(1)
    }, [fetchPokemons]);

    useEffect(() => {
        const fetchDetail = async (id:number) => {
            if (id !== 0){
                const result = await pokeService.detail(id)
                setIsDefaultImg(true)
                setPokeInfo(result)

                let ms:number = 0
                
                if(result.Stats){
                    ms = result.Stats.map((s:PokemonStat) => s.BaseStat).reduce((a:number, b:number) => {
                        return Math.max(a, b);
                    });
                }
                
                setMaxStat(ms)
            }
        }

        fetchDetail(selectedId)
    }, [selectedId])
  
    return (
        <>
            <PokeModal showModal={showModal} handleClose={handleClose}>
                {
                    pokeInfo !== undefined ?
                        <Container>
                            <Row>
                                <Col xs={12}>
                                    <Form.Group  controlId="formHorizontalCheck">
                                        <Form.Check label="Show shiny sprite" onClick={() => setIsDefaultImg(!isDefaultImg)} />
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    
                                    {
                                        isDefaultImg ?
                                            <Image src={pokeInfo?.Sprite?.Default} roundedCircle />
                                        :
                                            <Image src={pokeInfo?.Sprite?.Shiny} roundedCircle />

                                    }
                                </Col>
                                <Col xs={12}>
                                    <Form.Group  controlId="formHorizontalCheck">
                                        <p><b className={'title'}>Id: </b>{pokeInfo?.Id}</p>
                                        <p><b className={'title'}>Name: </b>{capFirstLetter(pokeInfo?.Name)}</p>
                                        <div>
                                            <p>
                                                <b className={'title'}>Types: </b>
                                            </p>
                                            <ul>
                                                {pokeInfo?.Type?.map((t:PokemonType, idx:any) => (
                                                    <li key={idx}>{`${capFirstLetter(t.Name)} (Slot: ${t.Slot})`}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <p>
                                                <b className={'title'}>Stats: </b>
                                            </p>
                                            <ul>
                                                {pokeInfo?.Stats?.map((s:PokemonStat, idx:any) => (
                                                    <li key={idx} style={{listStyle: 'none'}}>
                                                        {`${capFirstLetter(s.Name)} (Effort: ${s.Effort})`}
                                                            <ProgressBar now={s.BaseStat} max={maxStat} label={`Base stat: ${s.BaseStat}`} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    :
                        null
                }
            
            </PokeModal>
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

