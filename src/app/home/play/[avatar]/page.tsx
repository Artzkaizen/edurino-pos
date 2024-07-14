import React from "react";

const page = ({ params }: { params: { avatar: string } }) => {
	return <div>This is the play {params.avatar} page</div>;
};

export default page;
