import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Link from 'next/link';

import {Button} from '@mui/material';

import toast from 'react-hot-toast';

import Loader from '@components/Loader';

export default function Home() {
  return (
    <div>
        <Button onClick={() => toast.success('hello toast')}>Toast me</Button>
    </div>
  )
}
