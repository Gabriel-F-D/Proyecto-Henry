import React, {useState, useEffect} from 'react'
import { dogosApi } from '../api/dogosApi';
import {useDispatch, useSelector} from 'react-redux'
import {getDogos} from '../redux/actions/dogos'

const useDogosApi = (url, isDetail) => {

    const dispatch = useDispatch();
    const dogosFromStore = useSelector(state => state.dogos.dogos);

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    async function getDetail() {
        const {data} = await dogosApi.get(url);
        setData(data);
        setIsLoading(false);
    }

    async function getData() {
        if(!dogosFromStore){
            const {data} = await dogosApi.get(url);
            dispatch(getDogos(data));
            setData(data);
            setIsLoading(false);
        }else{
            setData(dogosFromStore)
            setIsLoading(false);
        }
    }

    useEffect(() => {
        isDetail ? getDetail() : getData();
    }, [])


    return{
        data,
        isLoading,
    }
}

export default useDogosApi
