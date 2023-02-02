import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

type SearchPlaceProps = {
  onChangeSearchPlace: (searchPlaceName: string) => void;
};

export const SearchPlace: React.FC<SearchPlaceProps> = ({
  onChangeSearchPlace: handleSearchPlace,
}) => {
  const [placeName, setPlaceName] = useState<string>();
  // 検索失敗などのエラー状態だす
  return (
    <TextField
      id="input-with-icon-textfield"
      data-testid="search-place-textfield"
      label="場所を検索する"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon data-testid="search-icon" />
          </InputAdornment>
        ),
      }}
      value={placeName}
      onChange={(event) => setPlaceName(event.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && placeName) {
          handleSearchPlace(placeName);
        }
      }}
      variant="standard"
    />
  );
};
