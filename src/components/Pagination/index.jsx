import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Pagination1 = ({ postsPerPage, totalPosts, paginate }) => {
    const [val, setVal] = useState(1);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    const handleChange = (e, v) => {
        paginate(v);
        setVal(v);
    };
    return (
        <Stack spacing={2} style={{ outline: "none" }}>
            <Pagination
                style={{ outline: "none" }}
                count={pageNumbers.length}
                page={val}
                onChange={handleChange}
                variant="outlined"
                color="primary"
                shape="rounded"
            />
            <br />
            <br />
        </Stack>
    );
};

export default Pagination1;
