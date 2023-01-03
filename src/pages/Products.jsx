import { useState, useRef } from "react";

// React Bootstrap
import { Col, Row, Card, Button, Modal, InputGroup, Form } from "react-bootstrap";

// Components
import { Heading } from "../components";

// Utilities Functions
import useDocumentTitle from "../utilities/useDocumentTitle";

// Products Data
import data from "../utilities/data";

const Membership = (props) => {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Become a Member
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>Registration Requirements</h4>
				{data.membershipRequirements.map((requirement, i) => (
					<ul key={i}>
						<li>{requirement}</li>
					</ul>
				))}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

const Products = () => {
	useDocumentTitle("Products - Githiga SHG")

	const [modalShow, setModalShow] = useState(false);

	const { loanProducts, membershipProducts, paymentChannel } = data;

	const textInput = useRef(null);
	const handleCopy = (id) => {
		const el = paymentChannel.find(item => item.id === id);
		navigator.clipboard.writeText(el.accountNumber).then(() => {
			alert(`Acc number copied successfully: ${el.accountNumber}`)
		});
	};

	const renderLoan = () => {
		let result = [];
		loanProducts.map((loan, index) => {
			result.push(
				<Col sm={12} md={12} lg={4} key={index} className="my-2 p-3 text-center">
					<Card className="shadow" style={{
						height: "280px"
					}}>
						<div className="p-3 text-center" >
							<img src={loan.icon} alt={`${loan.loanType}`} height="60px" className="m-1" />
						</div>
						<h4 className="clr">{loan.loanType}</h4>
						<p className="p-2">{loan.description}</p>
					</Card>
				</Col >
			)
		})
		return result;
	};

	const renderMembership = () => {
		let result = [];
		membershipProducts.map((membership, index) => {
			result.push(
				<Col sm={12} md={12} lg={4} key={index} className="my-2 p-3 text-center">
					<Card className="shadow" style={{
						height: "320px"
					}}>
						<div className="p-3 text-center">
							<img src={membership.icon} alt={`${membership.type}`} height="65px" className="m-1" />
						</div>
						<h4 className="clr">{membership.type}</h4>
						<p className="p-2">{membership.description}</p>
						<a href={membership.registrationForm} target="_blank" rel="noopenner noreferrer">
							<Button>Registration Form</Button>
						</a>
					</Card>
				</Col >
			)
		});
		return result;
	}

	const renderPaymentChannel = () => {
		let result = [];
		paymentChannel.map((channel, index) => {
			result.push(
				<Col className="my-4 py-2 text-center" sm={12} md={12} lg={4} key={index}>
					<Card className="shadow" style={{
						height: "auto"
					}}>
						<div className="p-3">
							<img src={channel.icon} alt={`${channel.name}`} height="60px" className="m-1" />
						</div>
						<h4 className="clr">{channel.name}</h4>
						<InputGroup className="mb-3" style={{ width: "90%", margin: "0 auto" }}>
							<Form.Control
								value={`Account No: ${channel.accountNumber}`}
								aria-label="Recipient's username" ref={textInput}
								aria-describedby="basic-addon2" disabled
								style={{ borderRadius: "2px", backgroundColor: "#ffffff" }}
							/>
							<Button onClick={() => handleCopy(channel.id)}>
								Copy
							</Button>
						</InputGroup>
					</Card>
				</Col>
			)
		});
		return result;
	}

	return (
		<Row>
			<Membership
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>

			<Heading title="Membership" />
			<div className="text-center">
				<p>
					It’s a requirement to be a legitimate member to qualify for loan products and
					other privileges of the self-help group.
				</p>
				<Button onClick={() => setModalShow(true)}>Become a Member</Button>
			</div>
			{renderMembership()}
			<Heading title="Loan Products" />
			<div className="text-center">
				<p>
					Members are entitled to different loans but will limited to only one type of loan product at any given time.
				</p>
			</div>
			{renderLoan()}
			<Heading title="Payment Channels" />
			{renderPaymentChannel()}
		</Row>
	)
}

export default Products;