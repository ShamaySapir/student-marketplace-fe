import React, { useEffect, useReducer } from "react";
import { List, ListSubheader } from "@mui/material";
import { map, reduce, upperFirst, pickBy, omitBy, find } from "lodash";
import FilterItem, { IFilterItemProps } from "./FilterItem";
import { GroupedItems } from "../../types/types";
interface IFiltersListProps {
  services: GroupedItems;
}

const EXCLUDED_PROPERTIES = ["id", "image"];
export default function FiltersList({ services }: IFiltersListProps) {
  function reducer(state: IFilterItemProps[], action: any) {
    switch (action.type) {
      case "init":
        return { initState: action.payload, currentFilters: action.payload };
      case "filter":
        if (action.payload.checked) {
          const initEntry = state.initState.filter(
            ({ title }) => title == action.filterName
          )?.[0];
          const filteredEntry = state.currentFilters.filter(
            ({ title }) => title == action.filterName
          )?.[0];
          return {
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
          };
        }
        if (action.payload.checked === false) {
          const filteredEntry = state.currentFilters.filter(
            ({ title }) => title == action.filterName
          )?.[0];
          return {
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
          };
        }
    }
  }

  const [servicesState, dispatch] = useReducer(reducer, {
    initState: [],
    currentFilters: [],
  });

  const getServicesFiltersData = (services: GroupedItems) => {
    const filterPossibilities = reduce(
      services,
      (acc: any, services: object[]) => {
        services.forEach((service: any) => {
          for (const property in service) {
            const upperProperty = upperFirst(property) as string;
            if (!EXCLUDED_PROPERTIES.includes(property)) {
              if (!acc[upperProperty]) {
                acc[upperProperty] = new Set();
              }
              acc[upperProperty].add(service[property]);
            }
          }
        });
        return acc;
      },
      {}
    );
    return filterPossibilities;
  };

  useEffect(() => {
    const computedFilters = getServicesFiltersData(services);
    const parsedFilters = reduce(
      computedFilters,
      (acc: any, filterValues: any, filterName: string) => {
        acc.push({
          title: filterName,
          subFilters: map(Array.from(filterValues), (filterValue) => ({
            title: filterValue,
          })),
        });
        return acc;
      },
      []
    );
    dispatch({
      type: "init",
      payload: parsedFilters,
    });
  }, [services]);

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      subheader={<ListSubheader component="div">Filters</ListSubheader>}
    >
      {map(servicesState.initState, (filterDetails, idx) => (
        <FilterItem
          key={idx}
          title={filterDetails.title}
          subFilters={filterDetails.subFilters}
          onFilter={(values: any) =>
            dispatch({
              type: "filter",
              filterName: filterDetails.title,
              payload: values,
            })
          }
        />
      ))}
    </List>
  );
}
