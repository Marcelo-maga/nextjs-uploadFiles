import { useState } from 'react'
import axios from 'axios'
import { VscChromeClose } from "react-icons/vsc"
import styles from '../styles/Home.module.css'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [file, setFile] = useState([])

  const handlerForm = (event) => {
    event.preventDefault()

    var bodyFormData = new FormData()

    bodyFormData.append('file', file)

    axios({
      method: 'POST',
      url: '/api/sendFile',
      data: bodyFormData
    })
  }

  return (
    <div className={styles.container}>

      <button className={styles.btnModal} onClick={() => setModalOpen(true)}>Upload your files</button>

      {modalOpen ? (
        <div className={styles.modalContainer}>

          <div className={styles.headerModal}>
              <h1>Upload your files</h1>
              <VscChromeClose onClick={() => setModalOpen(false)} />
          </div>

          <div className={styles.uploadModal}>

            <div className={styles.upload}>
              <form onSubmit={event => handlerForm(event)} encType='multipart/form-data'>
                <input type="file" name='file' onChange={event => setFile(event.target.files[0])}/>
                <button className={styles.btnUpload} type="subimit">Upload</button>
              </form>
            </div>
          </div>
        </div>
      ) : null}

    </div>
  )
}
