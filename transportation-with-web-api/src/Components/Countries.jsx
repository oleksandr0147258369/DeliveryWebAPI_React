import {Button, Card, Row, Col} from "antd";
import {useEffect, useState} from "react";
import CreateForm from "./CreateForm.jsx";

const {Meta} = Card;

const Countries = () => {
	const [loading, setLoading] = useState(true)
	const [countries, setCountries] = useState([])

	const getCountries = () => {
		let api = 'http://localhost:5055/api/Countries'
		fetch(api)
			.then(res => res.json())
			.then(data => {setCountries(data); setLoading(false)});
	}

	useEffect(() => {
		getCountries();
	}, []);

	return (
		<div className={'p-8'}>
			<Row justify={'center'} gutter={[16, 16]}>
				{countries.map((c, index) => {
					const key = `col-${index}`;
					return (
						<Col span={16}
							key={key}
							xs={{ flex: '50%' }}
							sm={{ flex: '50%' }}
							md={{ flex: '40%' }}
							lg={{ flex: '30%' }}
							xl={{ flex: '30%' }}
						>
							<Card
								loading={loading}
								hoverable
								cover={
									<img draggable={false}
										 alt={c.name}
										 src={`http://localhost:5055/images/${c.image}`}
									/>
								}
							>
								<Meta title={c.name} description={c.code}/>
							</Card>
						</Col>
					);
				})}
			</Row>
		</div>
	)
}

export default Countries