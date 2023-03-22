import { Modal } from '@mui/material'
import React from 'react'
import UploadPostForm from './UploadPostForm'

function UploadPostModal(props) {
  const { open, handleClose, image } = props
  
  return (
		<Modal open={open} onClose={handleClose}>
			<div>
				<UploadPostForm handleClose={handleClose} image={image} />
			</div>
		</Modal>
	)
}

export default UploadPostModal