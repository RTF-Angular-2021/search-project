export interface SearchResult {
    ns:number,
    pageid:number
    size:number,
    snippet:string,
    timestamp:string,
    title:string,
    wordcount:number
}

export interface QueryInfo {
    totalhits:number,
    suggestion:string,
    suggestionsnippet:string
  }
  
export interface QueryObj {
    batchcomplete: String;
    query:{
      search:Array<SearchResult>,
      searchinfo: QueryInfo
    }
}