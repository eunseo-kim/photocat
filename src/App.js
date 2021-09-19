import { api } from "./api/api.js";
import { SearchInput } from "./core/SearchInput.js";
import { SearchResult } from "./core/SearchResult.js";
import { ImageInfo } from "./core/ImageInfo.js";
import DarkMode from "./utils/Darkmode.js";
import Loader from "./utils/Loader.js";
import { setItem, getItem } from "./utils/LocalStorage.js";

console.log("app is running!");

export class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    this.loader = new Loader($target, false);
    this.darkMode = new DarkMode($target);

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword, isRandom) => {
        this.loader.setState(true);
        if (!isRandom) {
          await api.fetchCats(keyword).then(({ data }) => this.setState(data));
        } else {
          await api.fetchRandomCats().then(({ data }) => this.setState(data));
        }
        this.loader.setState(false);
      },
    });

    this.searchResult = new SearchResult({
      $target,
      onClick: async (image) => {
        this.loader.setState(true);
        this.imageInfo.setState({
          visible: true,
          info: await api.fetchCatDetail(image.id),
        });
        this.loader.setState(false);
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        info: null,
      },
    });

    this.recentSearch(); // 마지막 검색 결과 화면 불러오기
  }

  setState(nextData) {
    this.data = nextData;
    setItem("recent", this.data);
    this.searchResult.setState(nextData);
  }

  recentSearch() {
    const recentSearch = getItem("recent");
    if (recentSearch) {
      this.setState(recentSearch);
    }
  }
}
