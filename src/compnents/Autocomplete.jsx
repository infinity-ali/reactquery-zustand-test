import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { useQuery } from "react-query";
import { getCountries } from "../services/api/getAutocomplete";
import { Spinner } from "reactstrap";
import { useStore } from "../services/store/countriesGlobal";

export default function MultipleDemo() {
  const [countries, setCountries] = useState([
    { name: "United Kingdom", code: "UK" },
    { name: "United States", code: "USA" },
  ]);
  const [value, setValue] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  console.log("selected countries:", selectedCountries);
  const [filteredCountries, setFilteredCountries] = useState(null);
  console.log("filtered countries:", filteredCountries);
  const [dropdownOpen, setDopDownOpen] = useState(false);
  console.log("value:", value);

  const selectedCountriesGlobal = useStore(state => state.selectedCountries);
  console.log("selected countries global:", selectedCountriesGlobal);
  const addCountryGlobal = useStore(state => state.addCountry);

  // get Countries
  const { data, isError, isSuccess, isLoading } = useQuery('getCountries', getCountries, {
    refetchOnWindowFocus: false
  })
  console.log("Get Queries:", data);


  useEffect(() => {
    if (data) {
      setCountries(data?.data)
    }
  }, data)

  // add countries to global
  useEffect(() => {
    if (selectedCountries?.length !== 0 && selectedCountries) {
      addCountryGlobal(selectedCountries)
    }
  }, [selectedCountries])

  const search = (event) => {
    // Timeout to emulate a network connection
    console.log(event);
    setValue(event);
    if (
      event === "*" ||
      event === "/" ||
      event === "(" ||
      event === ")" ||
      event === "-" ||
      event === "+"
    ) {
      setSelectedCountries([
        ...selectedCountries,
        {
          name: event,
          type: "operation",
        },
      ]);
      setValue("");
    }
    if (event === "" && !selectedCountries.length !== 0) {
      let arr = [...selectedCountries];
      arr.pop();
      setSelectedCountries(arr);
    }
    setTimeout(() => {
      let _filteredCountries;

      if (!event.trim().length) {
        _filteredCountries = [...countries];
      } else {
        _filteredCountries = countries.filter((country) => {
          return country.name.toLowerCase().startsWith(event.toLowerCase());
        });
      }

      setFilteredCountries(_filteredCountries);
      if (_filteredCountries.length === 0) {
        setDopDownOpen(false);
      } else {
        setDopDownOpen(true);
      }
    }, 250);
  };
  console.log(selectedCountries);
  const handelDelete = (index) => {
    let array = [...selectedCountries];
    console.log("this is handel delte", array);
    array.splice(index, 1);
    console.log([...array]);
    setSelectedCountries(array);

    // set to global
    addCountryGlobal(selectedCountries)
  };

  // Perfrom Operation
  let result = null;
  let operation = null;

  selectedCountries?.map((item, index) => {
    if (item.value !== undefined) {
      if (operation === null) {
        result = item.value;
      } else {
        if (operation === '+') {
          result += item.value;
        } else if (operation === '-') {
          result -= item.value;
        } else if (operation === '*') {
          result *= item.value;
        } else if (operation === '/') {
          result /= item.value;
        }
      }
    } else if (item.type === 'operation') {
      operation = item.name;
    }
  });
  console.log("result:", result);

  return (
    <div className="w-50 mx-auto p-4 mt-4">
      <div>
        Result: {result}
        <Dropdown isOpen={dropdownOpen} toggle={() => setDopDownOpen(false)}>
          <DropdownToggle
            className="w-100"
            style={{
              background: "none"
            }}
          >
            <div className="d-flex gap-2 align-items-center">
              {selectedCountries?.map((item, key) =>
                item?.type === "operation" ? (
                  <p key={key} className="m-0 text-black">
                    {item.name}
                  </p>
                ) : (
                  <Badge key={key}>
                    <div className="d-flex align-items-center gap-2 justify-content-between">
                      <p className="m-0">{item.name}</p>
                      <Button size="sm" onClick={() => handelDelete(key)}>
                        X
                      </Button>
                    </div>
                  </Badge>
                ),
              )}
              <input
                value={value}
                style={{
                  padding: "0",
                  border: "0",
                  outline: "none",
                }}
                className="w-100"
                onChange={(e) => search(e.target.value)}
              />
              {
                isLoading && <Spinner color="dark">
                  Loading...
                </Spinner>
              }

            </div>
          </DropdownToggle>

          <DropdownMenu className="w-100">
            {filteredCountries?.map((item, key) => (
              <DropdownItem
                onClick={() => {
                  let arr = [...selectedCountries];
                  arr.push(item);
                  setSelectedCountries(arr);
                  setDopDownOpen(false);
                  setValue("");
                }}
                key={key}
              >
                {item.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>


      </div>
    </div>
  );
}
