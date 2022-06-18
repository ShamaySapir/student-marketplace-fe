// @ts-nocheck
import React, { useEffect, useState, useReducer } from "react";
import ServiceTile from "../components/serviceTile";
import * as routes from "../tools/api/routes";
import { DescriptionItem } from "../types/types";
import { Grid, Typography } from "@mui/material";
import SwimLane from "../components/swimLane";
import Filters from "../components/filters";
import LoaderWithText from "../components/LoaderWithText";
import { map, filter, groupBy, camelCase, sortBy } from "lodash";
import { getSession } from "next-auth/client";
import Image from "next/image";

export default function Page() {
  const [displayItems, setDisplayTileItems] = useState({});
  const [getUpdateSessionData, setUpdateSessionData] = useState();
  const [fetchingSession, setFetchingSession] = useState(false);

  const [fetchingTilesData, setFetchingTilesData] = useState<Boolean>(false);
  useEffect(() => {
    const getUpdatedSession = async () => {
      setFetchingSession(true);
      const updatedSession = await getSession();
      setUpdateSessionData(updatedSession);
      setFetchingSession(false);
    };
    getUpdatedSession();
  }, []);

  useEffect(() => {
    async function fetchDisplayTileData() {
      setFetchingTilesData(true);
      const itemsToShow = await routes.getDisplayTileData();
      setFetchingTilesData(false);
      setDisplayTileItems(itemsToShow);
    }
    fetchDisplayTileData();
  }, []);

  const prepareSlides = (services: DescriptionItem[]) =>
    services?.map((content: DescriptionItem, index) => (
      <ServiceTile {...content} key={index} />
    ));
  interface IState {
    initState: [];
    currentFilters: [];
    currentServices: [];
    initServices: [];
  }

  function reducer(state: IState, action: any) {
    switch (action.type) {
      case "init":
        return {
          initState: action.payload.filters,
          currentFilters: action.payload.filters,
          currentServices: action.payload.services,
          initServices: action.payload.services,
        };
      case "filter":
        if (action.payload.checked) {
          const initEntry = state.initState.filter(
            ({ title }) => title == action.filterName
          )?.[0];
          const filteredEntry = state.currentFilters.filter(
            ({ title }) => title == action.filterName
          )?.[0];
          const x = {
            ...state,
            currentFilters: [
              ...state.currentFilters.filter(
                ({ title }) => title !== action.filterName
              ),
              {
                ...filteredEntry,
                subFilters: [
                  ...filteredEntry.subFilters.filter(
                    ({ title }) => title !== action.payload.name
                  ),
                  initEntry.subFilters.filter(
                    ({ title }) => title === action.payload.name
                  )?.[0],
                ],
              },
            ],
            currentServices: sortBy(
              [
                ...state.currentServices,
                ...filter(
                  state.initServices,
                  (service) =>
                    service[camelCase(action.filterName)] ===
                    action.payload.name
                ),
              ],
              ["_id"]
            ),
          };
          return x;
        }
        if (action.payload.checked === false) {
          const filteredEntry = state.currentFilters.filter(
            ({ title }) => title == action.filterName
          )?.[0];
          const y = {
            ...state,
            currentFilters: [
              ...state.currentFilters.filter(
                ({ title }) => title !== action.filterName
              ),
              {
                ...filteredEntry,
                subFilters: [
                  ...filteredEntry.subFilters.filter(
                    ({ title }) => title !== action.payload.name
                  ),
                ],
              },
            ],
            currentServices: sortBy(
              [
                ...filter(
                  state.currentServices,
                  (service) =>
                    service[camelCase(action.filterName)] !==
                    action.payload.name
                ),
              ],
              ["_id"]
            ),
          };
          return y;
        }
        if (action.payload.textChanged) {
          return {
            ...state,
            currentServices: action.payload.value
              ? [
                  ...filter(state.initServices, (service) => {
                    return service.title
                      .toLowerCase()
                      .includes(action.payload.value.toLowerCase());
                  }),
                ]
              : state.initServices,
          };
        }
        if (action.payload.price || action.payload.rating) {
          const filterType = action.payload.price ? "price" : "rating";
          return {
            ...state,
            currentServices: action.payload.value
              ? [
                  ...filter(state.initServices, (service) => {
                    return (
                      service[filterType] >=
                        action.payload.value.currentRanges[0] &&
                      service[filterType] <=
                        action.payload.value.currentRanges[1]
                    );
                  }),
                ]
              : state.initServices,
          };
        }
      default:
        throw new Error();
    }
  }

  const [servicesState, dispatch] = useReducer(reducer, {
    initState: [],
    currentFilters: [],
    currentServices: displayItems,
    initServices: displayItems,
  });

  return (
    <Grid container sx={{ minHeight: "74vh" }}>
      {(fetchingTilesData && (
        <Grid container item xs justifyContent="center" alignItems="center">
          <LoaderWithText />
        </Grid>
      )) || (
        <>
          <Grid
            container
            item
            xs={2}
            sx={{ backgroundColor: "#ced9e6" }}
            flexDirection="column"
          >
            <Grid item>
              <Typography
                fontFamily={"Lato"}
                variant="h5"
                color={"#224870"}
                m={3}
              >
                Welcome {""}
                {!fetchingSession &&
                  (getUpdateSessionData?.user?.displayName || "You") + ","}
              </Typography>
              <Typography
                fontFamily={"Lato"}
                variant="h5"
                color={"#224870"}
                m={3}
              >
                What is your desire today?{" "}
              </Typography>
            </Grid>
            <Grid item>
              <Filters
                services={displayItems}
                dispatch={dispatch}
                onFilterServices={setDisplayTileItems}
                servicesState={servicesState}
              />
            </Grid>
            <Grid container item direction="column">
              <Grid item>
                <Typography
                  fontFamily={"Lato"}
                  variant="h5"
                  color={"#224870"}
                  m={3}
                >
                  Recognitions
                </Typography>
              </Grid>
              <Grid
                item
                sx={{
                  border: "5px solid #224870",
                  display: "flex",
                  // width: "13vw",
                  height: "40vh",
                  position: "relative",
                  margin: "0 10px",
                  padding: "5px",
                }}
              >
                <Image
                  src={"/images/Tie-comp.png"}
                  alt={"TIE_competition"}
                  // width={300}
                  layout="fill"
                  // objectFit="cover"
                  style={{ border: "2px solid #224870" }}
                  // height={500}
                />
              </Grid>
            </Grid>
            {/* <div
              style={{
                border: "5px solid #224870",
                display: "flex",
                width: "13vw",
                height: "40vh",
                position: "relative",
                margin: "0 10px",
                padding: "5px",
              }}
            >
              <Image
                src={"/images/Tie-comp.png"}
                alt={"TIE_competition"}
                // width={300}
                layout="fill"
                // objectFit="cover"
                style={{ border: "2px solid #224870" }}
                // height={500}
              />
            </div> */}
          </Grid>
          <Grid item xs={10} paddingLeft={3}>
            <center>
              <Typography
                fontFamily={"Lato"}
                variant="h2"
                color={"#224870"}
                justifyContent={"center"}
                m={5}
                sx={{ fontWeight: "bold" }}
              >
                Marketplace
              </Typography>
            </center>
            <Grid container direction="column">
              {map(
                groupBy(servicesState.currentServices, "serviceGroup"),
                (tileData, category) => (
                  <Grid container item key={category}>
                    <SwimLane
                      serviceTiles={prepareSlides(tileData)}
                      name={category}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export async function getServerSideProps() {
  return {
    props: { renderLayout: { renderSides: false } },
  };
}
