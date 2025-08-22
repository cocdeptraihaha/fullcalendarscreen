**Development Notes**:\
**15/8/2025**:\
Header and Sidebar: Header has no functionality yet, Sidebar doesn't have changeView \
Calendar: Copied from fullcalendar-examples/react18-typescript, not customized yet \
**18/8/2025**:\
Header: Done (HTML/CSS)\
Sidebar: Done (HTML/CSS and changeView functionality using Redux)\
 I edited the colors directly in the SVG files <-fixed \

Calendar: CSS completed, buttons displayed, data loaded from localStorage \

- Don't understand coloring method yet so added color property in localStorage
- Don't know what event title should be so generated based on the image
- Haven't fixed Delete yet, will do Create/Update after completing the form

Form: Just created, don't know what to do next\
Questions:

- How to pass data from form? (Redux or other methods?)
- Create custom droplist or add library?
  ![alt text]({2D3CCC06-2E8F-4BAF-A678-78CF839F194A}.png)\

**19/8/2025**
Changed from localStorage to json-server

**20/8/2025**
Sidebar: Import icons from react-feather instead of assets\
Form: Using data fetched from json-server\
Using Material UI interface but haven't customized much\
Haven't handled Service form yet\
CRUD not implemented yet\

**22/8/2025**
CRUD appointment completed but still has many bugs
Timezone bugs, CRUD failure bugs due to failed fetch

**Current Status**

- Header: Complete with styling
- Sidebar: Complete with view switching functionality
- Calendar: Complete with event display and basic interactions
- Form: Complete with validation and CRUD operations
- Service Selection: Complete with tag management
- Known Issues: Timezone handling, occasional fetch failures
- Recent Fix: Service tags now clear properly when switching from update to create mode

## Installation & Setup

```bash
npm install
npm run dev
npm run server
```

## Tech Stack

- React 18 + TypeScript
- FullCalendar
- Redux Toolkit
- React Hook Form
- Material UI
- JSON Server
- React Feather Icons
