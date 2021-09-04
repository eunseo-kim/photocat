import { api } from "./api/api.js";
import { SearchInput } from "./core/SearchInput.js";
import { SearchResult } from "./core/SearchResult.js";
import { ImageInfo } from "./core/ImageInfo.js";
import DarkMode from "./utils/Darkmode.js";

console.log("app is running!");

export class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.darkMode = new DarkMode($target);

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        api.fetchCats(keyword).then(({ data }) => this.setState(data));
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        this.imageInfo.setState({
          visible: true,
          image: await api.fetchCatDetail(image.id),
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
