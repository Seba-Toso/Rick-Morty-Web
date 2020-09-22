export let setQuery = (filter) => {
    switch(filter){
        case 'Characters':
            return (`    
            query ($page:Int, $filter: FilterCharacter) {
                characters(page:$page, filter: $filter){
                    info {
                        pages
                        next
                        prev
                    }
                    results{
                        name
                        image
                        id
                        status
                        species
                        type
                        gender
                        created
                    }
                }
            }
        `)
        case "Episodes":
            return(`    
            query($filter: FilterEpisode) {
                episodes(filter: $filter) {
                    info {
                        pages
                        next
                        prev
                        }
                    results {
                        name
                        id
                        air_date
                        episode
                        characters {
                            name
                            image
                        }
                        created
                        }
                }
              }
        `)
        case 'Locations':
            return (`
                query($filter: FilterLocation) {
                locations(filter: $filter) {
                  info {
                    pages
                    next
                    prev
                  }
                  results {
                    name
                    id
                    type
                    dimension
                    residents {
                      name
                      image
                    }
                  }
                }
              }
            `)
        default: 
            return
    }
}