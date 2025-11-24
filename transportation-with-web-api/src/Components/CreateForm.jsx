import {Button, Form, Input, Upload, message} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {useState} from "react";

const normFile = e => {
	if (Array.isArray(e)) {
		return e;
	}
	return e?.fileList;
};

const toSlug = (text) => {
	return text
		.toString() // Ensure the input is a string
		.normalize('NFD') // Decompose accented characters into base letter and accent
		.replace(/[\u0300-\u036f]/g, '') // Remove all diacritics (accents)
		.toLowerCase() // Convert the string to lowercase
		.trim() // Remove leading/trailing whitespace
		.replace(/[^a-z0-9\s-]/g, '') // Remove all characters that are not letters, numbers, spaces, or hyphens
		.replace(/\s+/g, '-') // Replace spaces with a single hyphen
		.replace(/-+/g, '-'); // Replace multiple consecutive hyphens with a single hyphen
}


const CreateForm = () => {
	const [form] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage();
	const [imageFile, setImageFile] = useState(null);
	// const [loading, setLoading] = useState(false);

	const onFinish = async (values) => {
		if (!imageFile) {
			console.log('Please, upload an image')
			return;
		}
		const formData = new FormData();
		formData.append('name', values.name);
		formData.append('code', values.code);
		formData.append('slug', toSlug(values.name))
		formData.append('image', imageFile);

		try {
			const res = await fetch('http://localhost:5055/api/Countries', {
				method: 'POST',
				body: formData
			});

			const data = await res.json();
			messageApi.info('Success!')
			console.log(data);

		} catch (err) {
			messageApi.error("Error uploading");
			console.error(err);
		}
	}


	return (
		<>
			{contextHolder}
			<Form
				form={form}
				layout={'vertical'}
				onFinish={onFinish}
			>
				<Form.Item label={'Name'} required name={'name'}>
					<Input placeholder={'Enter the name of the country'}/>
				</Form.Item>
				<Form.Item label={'Code'} required name={'code'}>
					<Input placeholder={'Enter the code of the country'}/>
				</Form.Item>
				<Form.Item getValueFromEvent={normFile} label={"Image"} required name={'image'}>
					<Upload
						beforeUpload={() => {false}}
						listType="picture-card"
						onChange={(info) => {
							const file = info.file.originFileObj;
							setImageFile(file);
						}}
						maxCount={1}
					>
						<button
							style={{color: 'inherit', cursor: 'inherit', border: 0, background: 'none'}}
							type="button"
						>
							<PlusOutlined/>
							<div style={{marginTop: 8}}>Upload</div>
						</button>
					</Upload>
				</Form.Item>
				<Form.Item>
					<Button htmlType={'submit'} type={'primary'}>Submit</Button>
				</Form.Item>
			</Form>
		</>
	)
}

export default CreateForm;