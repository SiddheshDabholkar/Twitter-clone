import React, { useState } from "react";
import SearchModal from "../../components/Modals/SearchModal";
import { FETCH_SEARCHED_USER } from "../../graphql/queries";
import useDropdown from "../../hooks/useDropdown";
import HomeNavbar from "../Mobile/Navbar";
import styled from "styled-components";
import { StyledSearchInput } from "../../components/Search";
import { useQuery } from "@apollo/client";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 2px;
  align-items: center;
`;
export default function Explore() {
  const [query, setQuery] = useState("");
  const { DropDown, show, toggle, setShow } = useDropdown(SearchModal);
  const { loading, data } = useQuery(FETCH_SEARCHED_USER, {
    variables: { username: query },
  });

  return (
    <>
      <HomeNavbar>
        <SearchContainer>
          <StyledSearchInput
            placeholder="search"
            value={query}
            onChange={(e) => {
              if (e.target.value.length > 0) {
                const q = e.target.value;
                setQuery(q);
                q.length > 0 ? setShow(true) : setShow(false);
              } else {
                setQuery("");
              }
            }}
            onClick={() => setShow(true)}
          />
        </SearchContainer>
      </HomeNavbar>
      <>{show && <DropDown show={show} setShow={setShow} data={data} />}</>
    </>
  );
}
