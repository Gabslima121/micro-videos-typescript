import { omit } from 'lodash'

import { Category, CategoryProperties } from "./category";
import UniqueEntityId from '../../../@seedwork/domain/unique-entity-id.vo';

type CategoryData = { props: CategoryProperties, id?: UniqueEntityId }

describe("Category Unit Tests", () => {

  test('constructor of category', () => {
    let category = new Category({
      name: 'Movie',
    })
    let props = omit(category.props, 'created_at')
    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true
    })
    expect(category.props.created_at).toBeInstanceOf(Date)

    let created_at = new Date()

    category = new Category({
      name: 'Documentary',
      description: 'some description',
      is_active: false
    })
    expect(category.props).toStrictEqual({
      name: 'Documentary',
      description: 'some description',
      is_active: false,
      created_at
    })


    category = new Category({
      name: 'Movie',
      description: 'other description',
    })
    expect(category.props).toMatchObject({
      name: 'Movie',
      description: 'other description',
    })

    category = new Category({
      name: 'Movie',
      is_active: true,
    })
    expect(category.props).toMatchObject({
      name: 'Movie',
      is_active: true
    })

    created_at = new Date()
    category = new Category({
      name: 'Movie',
      created_at
    })

    expect(category.props).toMatchObject({
      name: 'Movie',
      created_at,
    })
  })

  test('id field', () => {
    const data: CategoryData[] = [
      { props: { name: 'Movie'} },
      { props: { name: 'Movie'}, id: null },
      { props: { name: 'Movie'}, id: undefined },
      { props: { name: 'Movie'}, id: new UniqueEntityId() },
    ]

    data.forEach((item) => {
      const category = new Category(item.props, item.id)

      expect(category.id).not.toBeNull()
      expect(category.id).toBeInstanceOf(UniqueEntityId)
    })
  })

  test('getter of name prop', () => {
    const category = new Category({ name: 'Movie' })

    expect(category.name).toBe('Movie')
  })

  test('getter and setter of description prop', () => {
    let category = new Category({
      name: 'Movie',
    })
    expect(category.description).toBeNull()

    category = new Category({
      name: 'Movie',
      description: 'Movie description'
    })
    expect(category.description).toBe('Movie description')

    category = new Category({
      name: 'Movie',
    })

    category['description'] = 'Other description'
    expect(category.description).toBe('Other description')

    category['description'] = undefined
    expect(category.description).toBeNull()
  })

  test('getter and setter of is_active prop', () => {
    let category = new Category({
      name: 'Movie',
    })
    expect(category.is_active).toBeTruthy()

    category = new Category({
      name: 'Movie',
      is_active: true
    })
    expect(category.is_active).toBeTruthy()

    category = new Category({
      name: 'Movie',
      is_active: false,
    })
    expect(category.is_active).toBeFalsy()
  })

  test('getter of created_at prop', () => {
    let category = new Category({
      name: 'Movie',
    })
    expect(category.created_at).toBeInstanceOf(Date)

    const created_at = new Date()

    category = new Category({
      name: 'Movie',
      created_at
    })
    expect(category.created_at).toBe(created_at)
  })
});
