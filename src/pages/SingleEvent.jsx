import { useEffect, useState } from "react";

// Components
import { Heading } from "../components"

// Utilities Functions
import useDocumentTitle from "../utilities/useDocumentTitle";
import { handleTimeStamp } from "../utilities/handleTimestamp";

// React Bootstrap
import { Row, Col } from "react-bootstrap"

// React Router
import { useParams } from "react-router-dom";

// Sanity CMS
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react"

const SinglePost = () => {

	const [singlePost, setSinglePost] = useState(null);
	const { slug } = useParams();

	const builder = imageUrlBuilder(sanityClient);

	const urlFor = (source) => {
		return builder.image(source);
	}

	useEffect(() => {
		sanityClient.fetch(
			`*[slug.current == "${slug}"]{
				title,
				_id,
				slug,
				mainImage{ asset->{ _id, url} },
				body,
				"name": author->name,
				"authorImage": author->image,
				publishedAt
			}`)
			.then((data) => setSinglePost(data[0]))
			.catch(console.error);

	}, [slug]);

	useDocumentTitle(`${singlePost?.title} - Githiga SHG`)

	if (!singlePost) return <div>Loading...</div>;

	return (
		<Row>
			<Heading title={singlePost.title} />
			<Col sm={12} md={12} lg={12} className="py-4">
				<header>
					<img
						src={singlePost.mainImage.asset.url}
						alt={singlePost.title}
						className="d-block w-100"
						style={{ borderRadius: "5px", objectFit: "cover", height: "400px" }}
					/>
				</header>
				<div className="py-2 m-4 author">
					<img
						src={urlFor(singlePost.authorImage).url()}
						alt={singlePost.name}
						style={{
							width: "80px",
							height: "80px",
							borderRadius: "50%",
							objectFit: "cover",
						}}
					/>
					<div className="name">
						<h5>{singlePost.name}</h5>
						<p className="text-muted">{handleTimeStamp(singlePost.publishedAt)}</p>
					</div>
					{/* <p>{singlePost.bio}</p> */}
				</div>
				<div className="py-2 m-4">
					<BlockContent blocks={singlePost.body} projectId="q04r70xj" dataset="production" />
				</div>
			</Col>
		</Row>
	)
}

export default SinglePost;