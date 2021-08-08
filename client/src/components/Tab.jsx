import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const TabPane = styled.div``;

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 25px 0px;
`;
const TabHeader = styled.ul`
  height: 50px;
  width: 100%;
  /* background-color: blue; */
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 0;
`;
const TabHeaderList = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #545353;
  font-weight: bold;
  height: 40px;
  border-radius: 5%;
  cursor: pointer;
  width: 100%;
  margin: 2px;
  :hover {
    background-color: #1da1f224;
    color: #1da1f2;
  }
  .active {
    border-bottom: 2px solid #1da1f2;
  }
`;
const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const TabChild = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default function Tab(props) {
  const { children } = props;
  const [tabHeader, setTabHeader] = useState([]);
  const [childContent, setChildConent] = useState({});
  const [active, setActive] = useState("");
  useEffect(() => {
    const headers = [];
    const childCnt = {};
    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return;
      const { name } = element.props;
      headers.push(name);
      childCnt[name] = element.props.children;
    });
    setTabHeader(headers);
    setActive(headers[0]);
    setChildConent({ ...childCnt });
    // console.log(childCnt);
  }, [props, children]);
  const changeTab = (name) => {
    setActive(name);
  };
  return (
    <Tabs>
      <TabHeader>
        {tabHeader.map((item) => (
          <TabHeaderList
            onClick={() => changeTab(item)}
            key={item}
            className={item === active ? "active" : ""}
          >
            {item}
          </TabHeaderList>
        ))}
      </TabHeader>
      <TabContent>
        {Object.keys(childContent).map((key) => {
          if (key === active) {
            return <TabChild>{childContent[key]}</TabChild>;
          } else {
            return null;
          }
        })}
      </TabContent>
    </Tabs>
  );
}
