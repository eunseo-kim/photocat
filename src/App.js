import { api } from "./api/api.js";
import { SearchInput } from "./core/SearchInput.js";
import { SearchResult } from "./core/SearchResult.js";
import { ImageInfo } from "./core/ImageInfo.js";
import DarkMode from "./utils/Darkmode.js";
import Loader from "./utils/Loader.js";

console.log("app is running!");

export class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    this.loading = new Loader($target, false);
    this.darkMode = new DarkMode($target);

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        this.loading.setState(true);
        await api.fetchCats(keyword).then(({ data }) => this.setState(data));
        this.loading.setState(false);
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        this.loading.setState(true);
        this.imageInfo.setState({
          visible: true,
          image: await api.fetchCatDetail(image.id),
        });
        this.loading.setState(false);
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
