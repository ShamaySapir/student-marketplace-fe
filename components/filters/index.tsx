import React, { useEffect, useState } from "react";
import { List, ListSubheader } from "@mui/material";
import { map, reduce, upperFirst } from "lodash";
import FilterItem, { IFilterItemProps } from "./FilterItem";
import { GroupedItems } from "../../types/types";
interface IFiltersListProps {
  services: GroupedItems;
}

const EXCLUDED_PROPERTIES = ["id", "image"];
export default function FiltersList({ services }: IFiltersListProps) {
  const [filters, setFilters] = useState<IFilterItemProps[]>([]);
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
    setFilters(parsedFilters);
  }, [services]);

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Filters
        </ListSubheader>
      }
    >
      {map(filters, (filterDetails, idx) => (
        <FilterItem
          key={idx}
          title={filterDetails.title}
          subFilters={filterDetails.subFilters}
        />
      ))}
    </List>
  );
}
