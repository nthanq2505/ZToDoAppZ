import { HStack, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { StateOfFilterTasks } from "../../utils/constants";

export default function FilterTask({ filterValue, setFilterValue }) {
  return (
    <HStack spacing={5}>
      <Text>Filter:</Text>
      <RadioGroup colorScheme="teal" defaultValue={StateOfFilterTasks.ALL} value={filterValue} onChange={setFilterValue}>
        <Stack direction='row' spacing={5}>
          <Radio value={StateOfFilterTasks.ALL}><Text fontSize='sm'>All</Text></Radio>
          <Radio value={StateOfFilterTasks.NOT_DONE}><Text fontSize='sm'>Undone</Text></Radio>
          <Radio value={StateOfFilterTasks.DONE}><Text fontSize='sm'>Done</Text></Radio>
        </Stack>
      </RadioGroup>
    </HStack>
  )
}