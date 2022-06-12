// @ts-nocheck
import React, { useEffect, useState, useReducer } from "react";
import ServiceTile from "../components/serviceTile";
import * as routes from "../tools/api/routes";
import { DescriptionItem } from "../types/types";
import { Divider, Grid, Typography } from "@mui/material";
import SwimLane from "../components/swimLane";
import Filters from "../components/filters";
import { map, filter, groupBy, camelCase, sortBy } from "lodash";

export default function Page() {
  const [displayItems, setDisplayTileItems] = useState({});
  useEffect(() => {
    async function fetchDisplayTileData() {
      const itemsToShow = await routes.getDisplayTileData();
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
        if (action.payload.price) {
          return {
            ...state,
            currentServices: action.payload.value
              ? [
                  ...filter(state.initServices, (service) => {
                    return (
                      service.price >= action.payload.value.currentRanges[0] &&
                      service.price <= action.payload.value.currentRanges[1]
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
    <Grid container>
      <Grid item xs={2}>
        <Filters
          services={displayItems}
          dispatch={dispatch}
          onFilterServices={setDisplayTileItems}
          servicesState={servicesState}
        />
      </Grid>
      <Grid item xs={10} paddingLeft={3}>
        <center>
          <Typography
            fontFamily={"Lato"}
            variant="h4"
            color={"#224870"}
            justifyContent={"center"}
            m={5}
          >
            <strong>Marketplace </strong>
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
    </Grid>
  );
}

export async function getServerSideProps() {
  return {
    props: { renderLayout: { renderSides: false } },
  };
}
